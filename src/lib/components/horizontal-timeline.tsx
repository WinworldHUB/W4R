import { FC, useMemo } from "react";
import { OrderStatus } from "../awsApis";
import { DeliveryStatus, TimelineStatus } from "../constants";

interface HorizontalTimelineProps {
  items: TimelineItem[];
  orderStatus: OrderStatus;
  deliveryStatus: string;
}

const HorizontalTimeline: FC<HorizontalTimelineProps> = ({
  items,
  orderStatus,
  deliveryStatus,
}) => {
  const filteredStatuses = useMemo(
    () =>
      items.map((item, index) => {
        switch (orderStatus) {
          case OrderStatus.UNPAID:
            return {
              ...item,
              status:
                index < 1
                  ? TimelineStatus.Completed
                  : index === 1
                  ? TimelineStatus.Active
                  : TimelineStatus.Pending,
            };

          case OrderStatus.PAID:
            return {
              ...item,
              status:
                index < 2
                  ? TimelineStatus.Completed
                  : index === 2
                  ? TimelineStatus.Active
                  : TimelineStatus.Pending,
            };

          case OrderStatus.PROCESSING:
            if (index < 3) return { ...item, status: TimelineStatus.Completed };
            if (index === 3 && deliveryStatus === DeliveryStatus.InTransit) {
              return { ...item, status: TimelineStatus.Active };
            } else if (
              index === 4 &&
              deliveryStatus === DeliveryStatus.ArrivedInUK
            ) {
              return { ...item, status: TimelineStatus.Active };
            } else {
              return item;
            }

          default:
            return { ...item, status: TimelineStatus.Completed };
        }
      }),
    [items, orderStatus]
  );
  return (
    <div className="timeline">
      {(filteredStatuses ?? []).map((item, index) => (
        <div key={`${item.title}-${index}`}>
          <div className="timestamp">
            <span className="date">{item.status}</span>
          </div>

          <div className={`status ${item.status}`}>
            <span>{item.title}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HorizontalTimeline;
