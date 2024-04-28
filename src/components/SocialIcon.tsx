import { IconType } from "react-icons";
import classNames from "classnames";

const SocialIcon = ({
    href,
    Icon,
    className,
}: {
    href: string;
    Icon: IconType;
    className?: string;
}) => {
    return (
        <a
            href={href}
            className={classNames("contact-social-icon", className)}
            target={"_blank"}
        >
            <Icon className={"is-size-4"} data-testid={"social-icon"} />
        </a>
    );
};

export default SocialIcon;
