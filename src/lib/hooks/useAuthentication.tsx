import { useEffect, useState } from "react";
import config from "../../amplifyconfiguration.json";
import { Amplify } from "aws-amplify";
import {
  AuthUser,
  fetchAuthSession,
  getCurrentUser,
  signIn,
  signOut,
} from "aws-amplify/auth";
import useApi from "./useApi";
import { Member } from "../awsApis";
import { MEMBERS_APIS } from "../constants/api-constants";

Amplify.configure(config);

interface UseAuthenticationState {
  error: string;
  accessToken: string;
  refreshToken: string;
  isUserSignedIn: boolean;
  username: string;
  signInUser: (credentials: Credentials) => void;
  signOutUser: VoidFunction;
}

const useAuthentication = (): UseAuthenticationState => {
  const [accessToken, setAccessToken] = useState<string>(null);
  const [refreshToken, setRefreshToken] = useState<string>(null);
  const [error, setError] = useState<string>(null);
  const [isUserSignedIn, setIsSignInDone] = useState<boolean>(false);
  const { getData: getMemberByEmail } = useApi<Member>();
  const [username, setUsername] = useState<string>(null);

  const getUserData = (ignoreError: boolean) => {
    getCurrentUser()
      .then((user) => {
        fetchAuthSession()
          .then((session) => {
            setAccessToken(session.tokens?.accessToken.toString());
            setRefreshToken(session.tokens?.idToken.toString());
          })
          .catch((reason) => {
            if (!ignoreError) {
              setError(reason.message);
              setIsSignInDone(false);
            }
          });
      })
      .catch((reason) => {
        if (!ignoreError) {
          setError(reason.message);
          setIsSignInDone(false);
        }
      });
  };

  useEffect(() => {
    getUserData(true);
  }, []);

  useEffect(() => {
    if (isUserSignedIn) {
      getUserData(false);
    }
  }, [isUserSignedIn]);

  const signInUser = (credentials: Credentials) => {
    signIn({ username: credentials.email, password: credentials.password })
      .then((value) => {
        getMemberByEmail(
          `${MEMBERS_APIS.GET_MEMBER_BY_EMAIL_API}/${credentials.email}`
        ).then((member) => {
          setUsername(member.name ?? "User");

          setIsSignInDone(value.isSignedIn);

          if (value.isSignedIn) {
            setError(null);
          } else {
            setError(value.nextStep?.signInStep);
            setIsSignInDone(false);
          }
        });
      })
      .catch((reason) => {
        signOutUser();
        setError(reason.message);
        setIsSignInDone(false);
      });
  };

  const signOutUser = () => {
    signOut()
      .then(() => {
        setError(null);
        setIsSignInDone(false);
      })
      .catch((reason) => {
        setIsSignInDone(true);
        setError(reason.message);
      });
  };

  return {
    accessToken,
    refreshToken,
    isUserSignedIn,
    error,
    username,
    signInUser,
    signOutUser,
  };
};

export default useAuthentication;
