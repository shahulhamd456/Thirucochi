function Card(props) {
  const { variant, extra, children, ...rest } = props;
  // Defaults first; `extra` last so themed cards can use `!bg-[...]` to override the surface.
  return (
    <div
      className={`!z-5 relative flex flex-col rounded-xl border border-gray-200 bg-white bg-clip-border text-navy-700 shadow-sm dark:border-white/10 dark:!bg-navy-800 dark:text-white dark:shadow-none ${extra ?? ""}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
