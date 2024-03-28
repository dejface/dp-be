import React from "react";
import Link from "next/link";
import { getPathByCategoryId } from "@/src/utils/getPathByCategoryId";
import { getTransKeyByCategoryId } from "@/src/utils/getTransKeyByCategoryId";
import { PRODUCTS_PATH } from "@/src/utils/constants";
import { useLanguage, useTranslation } from "@/src/contexts/TransContext";

type BreadcrumbsProps = {
    title: string;
    categoryId: string;
};

const ProductBreadcrumbs = ({ title, categoryId }: BreadcrumbsProps) => {
    const trans = useTranslation();
    const [locale] = useLanguage();
    const categoryPath = getPathByCategoryId(categoryId);
    const transKey = getTransKeyByCategoryId(categoryId);

    return (
        <nav
            className="breadcrumb is-small mt-4 px-1-mobile"
            aria-label="breadcrumbs"
        >
            <ul>
                <li>
                    <Link href={"/"} locale={locale}>
                        <span className={"breadcrumb__item"}>
                            {trans("app.homepage.title").toUpperCase()}
                        </span>
                    </Link>
                </li>
                {transKey && (
                    <li>
                        <Link
                            href={`/${PRODUCTS_PATH}/${categoryPath}`}
                            locale={locale}
                        >
                            <span className={"breadcrumb__item"}>
                                {trans(transKey).toUpperCase()}
                            </span>
                        </Link>
                    </li>
                )}
                <li className="is-active">
                    <Link href="#" aria-current="page">
                        <span className={"breadcrumb__item-active"}>
                            {title.toUpperCase()}
                        </span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default ProductBreadcrumbs;
