import React from "react";

function useOutsideAlerter(ref, setX) {
  React.useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setX(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setX]);
}

const Dropdown = (props) => {
  const { button, children, classNames, animation, closeOnPanelClick = true } =
    props;
  const wrapperRef = React.useRef(null);
  const [openWrapper, setOpenWrapper] = React.useState(false);
  useOutsideAlerter(wrapperRef, setOpenWrapper);

  return (
    <div ref={wrapperRef} className="relative flex">
      <div className="flex" onMouseDown={() => setOpenWrapper(!openWrapper)}>
        {button}
      </div>
      <div
        role="presentation"
        onClick={
          closeOnPanelClick ? () => setOpenWrapper(false) : undefined
        }
        className={`${classNames} absolute z-[100] ${
          animation
            ? animation
            : "origin-top-right transition-all duration-300 ease-in-out"
        } ${
          openWrapper
            ? "pointer-events-auto scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
