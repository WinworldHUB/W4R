import { FC } from "react";

interface HorizontalTimelineProps {
  items: TimelineItem[];
}

const HorizontalTimeline: FC<HorizontalTimelineProps> = ({ items }) => {
  return (
    <div className="timeline">
      {(items ?? []).map((item, index) => (
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
