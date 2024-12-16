import BookmarkIcon from "./BookmarkIcon";
import { JobItem } from "../lib/types/jobItems.ts";
import React from "react";

type JobListItemProps = {
  jobItem: JobItem;
  isSelected: boolean;
}

const JobListItem = ({ jobItem, isSelected }: JobListItemProps )=> {

  const handleOnClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.href = `/#${jobItem.id}`;
  }

  return (
    <li className={`job-item ${isSelected ? "job-item--active" : ""}`}>
      <a className="job-item__link" onClick={handleOnClick}>
        <div className="job-item__badge">{jobItem.badgeLetters}</div>

        <div className="job-item__middle">
          <h3 className="third-heading">{jobItem.title}</h3>
          <p className="job-item__company">{jobItem.company}</p>
        </div>

        <div className="job-item__right">
          <BookmarkIcon id={jobItem.id}/>
          <time className="job-item__time">{jobItem.daysAgo}d</time>
        </div>
      </a>
    </li>
  );
}

export default JobListItem;