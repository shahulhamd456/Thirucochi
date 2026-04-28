import React from "react";
import Dropdown from "components/dropdown";
import { AiOutlineUser } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { MdOutlineFileDownload, MdRefresh, MdOutlineShare } from "react-icons/md";

const DEFAULT_ITEMS = [
  {
    label: "Refresh data",
    Icon: MdRefresh,
  },
  {
    label: "Download report",
    Icon: MdOutlineFileDownload,
  },
  {
    label: "Share widget",
    Icon: MdOutlineShare,
  },
  {
    label: "Widget settings",
    Icon: FiSettings,
  },
];

/**
 * @param {{ transparent?: boolean, items?: Array<{ label: string, Icon?: React.ComponentType<{ className?: string }>, onClick?: () => void }> }} props
 */
function CardMenu(props) {
  const { transparent, items } = props;
  const rows = items?.length ? items : DEFAULT_ITEMS;

  return (
    <Dropdown
      button={
        <button
          type="button"
          aria-label="Card actions"
          aria-haspopup="true"
          className={`flex items-center text-xl hover:cursor-pointer ${
            transparent
              ? "bg-none text-white hover:bg-none active:bg-none"
              : "bg-lightPrimary p-2 text-brand-500 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"
          } linear justify-center rounded-lg font-bold transition duration-200`}
        >
          <BsThreeDots className="h-6 w-6" />
        </button>
      }
      animation={"origin-top-right transition-all duration-300 ease-in-out"}
      classNames={`${transparent ? "top-8" : "top-11"} right-0 w-max`}
      children={
        <div className="z-50 w-max min-w-[11rem] rounded-xl bg-white py-2 px-2 text-sm shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
          {rows.map((row) => {
            const Icon = row.Icon;
            return (
              <button
                key={row.label}
                type="button"
                className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-left font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-navy-700 dark:text-gray-200 dark:hover:bg-white/10 dark:hover:text-white"
                onClick={() => {
                  row.onClick?.();
                }}
              >
                {Icon ? (
                  <span className="flex shrink-0 text-lg text-brand-500 dark:text-brand-300">
                    <Icon className="h-5 w-5" />
                  </span>
                ) : null}
                {row.label}
              </button>
            );
          })}
        </div>
      }
    />
  );
}

export default CardMenu;
