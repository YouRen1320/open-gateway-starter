import { Link } from "react-router-dom";
import { isExternalUrl } from "../config/site";
import { Icon } from "./Icon";

// Internal targets stay in the SPA; fully qualified URLs use normal browser navigation.
export function ActionLink({ to, children, className = "", showExternal = false, ...props }) {
  if (isExternalUrl(to)) {
    return (
      <a className={className} href={to} rel="noreferrer" {...props}>
        {children}
        {showExternal && <Icon name="external" size={16} />}
      </a>
    );
  }

  return (
    <Link className={className} to={to} {...props}>
      {children}
    </Link>
  );
}
