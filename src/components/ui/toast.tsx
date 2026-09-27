"use client";

import { toast, ToastContainer, ToastOptions } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./toast.css";

const CheckIcon = () => (
  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime-400">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </span>
);

const BookmarkIcon = () => (
  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#E8EAEF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </svg>
  </span>
);

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 2500,
  hideProgressBar: true,
  closeButton: false,
  className: "fitlog-toast",
};

export const notifyAddedToPlan = (message = "Added to today's plan") => {
  toast(
    <div className="flex items-center gap-3">
      <CheckIcon />

      <span className="text-[15px] font-medium text-[#E8EAEF]">{message}</span>
    </div>,
    defaultOptions,
  );
};

export const notifyRemovedFromPlan = (
  message = "Removed from today's plan",
) => {
  toast(
    <div className="flex items-center gap-3">
      <CheckIcon />

      <span className="text-[15px] font-medium text-[#E8EAEF]">{message}</span>
    </div>,
    defaultOptions,
  );
};

export const notifySaved = (message = "Saved for later") => {
  toast(
    <div className="flex items-center gap-3">
      <BookmarkIcon />

      <span className="text-[15px] font-medium text-[#E8EAEF]">{message}</span>
    </div>,
    defaultOptions,
  );
};

export const notifyRemovedFromSaved = (message = "Removed from saved") => {
  toast(
    <div className="flex items-center gap-3">
      <BookmarkIcon />

      <span className="text-[15px] font-medium text-[#E8EAEF]">{message}</span>
    </div>,
    defaultOptions,
  );
};

export const notifyAlreadyInPlan = (
  message = "This workout is already in your plan",
) => {
  toast(
    <div className="flex items-center gap-3">
      <CheckIcon />

      <span className="text-[15px] font-medium text-[#E8EAEF]">{message}</span>
    </div>,
    defaultOptions,
  );
};

export const notifyPlanFull = (message = "Today's plan is full") => {
  toast(
    <div className="flex items-center gap-3">
      <CheckIcon />

      <span className="text-[15px] font-medium text-[#E8EAEF]">{message}</span>
    </div>,
    defaultOptions,
  );
};

export const FitlogToastContainer = () => (
  <ToastContainer
    position="top-right"
    hideProgressBar
    closeButton={false}
    toastClassName="fitlog-toast"
  />
);
