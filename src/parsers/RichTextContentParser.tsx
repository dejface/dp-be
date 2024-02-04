import { BLOCKS, INLINES, MARKS, Node } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import React, { ReactNode } from "react";
import Image from "next/image";
import {
    AssetLinks,
    EntryLinks,
    LinkAsset,
    LinkEntry,
    RichTextContent,
} from "@/src/types/Article";
import Link from "next/link";

const renderOptions = (links: AssetLinks & EntryLinks) => {
    const assetMap = new Map();
    if (Array.isArray(links.assets.block)) {
        links.assets.block.forEach((asset: LinkAsset) => {
            assetMap.set(asset.sys.id, asset);
        });
    } else {
        console.error(
            "Expected links.assets to be an array, received:",
            links.assets,
        );
    }

    const entryMap = new Map();
    if (Array.isArray(links.entries.hyperlink)) {
        links.entries.hyperlink.forEach((entry: LinkEntry) => {
            entryMap.set(entry.sys.id, entry);
        });
    } else {
        console.error(
            "Expected links.entries to be an array, received:",
            links.entries,
        );
    }

    return {
        renderNode: {
            [BLOCKS.EMBEDDED_ASSET]: (node: Node) => {
                const assetId = node.data.target.sys.id;
                const asset = assetMap.get(assetId) as LinkAsset;

                if (!asset) {
                    return null;
                }

                return (
                    <div className="is-flex is-justify-content-center pt-2 pb-2">
                        <Image
                            src={asset.url}
                            alt={asset.title}
                            width={asset.width}
                            height={asset.height}
                        />
                    </div>
                );
            },
            [INLINES.HYPERLINK]: (node: Node, children: ReactNode) => {
                let href = node.data.uri;
                if (!/^https?:\/\//i.test(href)) {
                    href = "https://" + href;
                }

                return (
                    <Link href={href} target="_blank" rel="noopener noreferrer">
                        {children}
                    </Link>
                );
            },
            [BLOCKS.PARAGRAPH]: (node: Node, children: ReactNode) => {
                if (node.nodeType === BLOCKS.LIST_ITEM) {
                    return <>{children}</>;
                } else {
                    return <p className={"pt-2 pb-2"}>{children}</p>;
                }
            },
            [BLOCKS.HEADING_1]: (_node: Node, children: ReactNode) => {
                return (
                    <h1 className="is-size-1 is-size-2-mobile pt-2 pb-2">
                        {children}
                    </h1>
                );
            },
            [BLOCKS.HEADING_2]: (_node: Node, children: ReactNode) => {
                return (
                    <h2 className="is-size-2 is-size-3-mobile pt-2 pb-2">
                        {children}
                    </h2>
                );
            },
            [BLOCKS.HEADING_3]: (_node: Node, children: ReactNode) => {
                return (
                    <h3 className="is-size-3 is-size-4-mobile pt-2 pb-2">
                        {children}
                    </h3>
                );
            },
            [BLOCKS.HEADING_4]: (_node: Node, children: ReactNode) => {
                return (
                    <h4 className="is-size-4 is-size-5-mobile pt-2 pb-2">
                        {children}
                    </h4>
                );
            },
            [BLOCKS.HEADING_5]: (_node: Node, children: ReactNode) => {
                return (
                    <h5 className="is-size-5 is-size-6-mobile pt-2 pb-2">
                        {children}
                    </h5>
                );
            },
            [BLOCKS.HEADING_6]: (_node: Node, children: ReactNode) => {
                return (
                    <h6 className="is-size-6 is-size-7-mobile pt-2 pb-2">
                        {children}
                    </h6>
                );
            },
            [BLOCKS.UL_LIST]: (_node: Node, children: ReactNode) => {
                return (
                    <ul className="blog__article__list pt-2 pb-2">
                        {children}
                    </ul>
                );
            },
            [BLOCKS.OL_LIST]: (_node: Node, children: ReactNode) => {
                return (
                    <ol className="blog__article__list pt-2 pb-2">
                        {children}
                    </ol>
                );
            },
            [BLOCKS.LIST_ITEM]: (
                _node: Node,
                children: ReactNode | ReactNode[],
            ) => {
                const childrenArray = Array.isArray(children)
                    ? children
                    : [children];

                const newChildren = childrenArray.map((child) => {
                    if (React.isValidElement(child) && child.type === "p") {
                        return child.props.children;
                    }
                    return child;
                });

                return <li>{newChildren}</li>;
            },
        },
        renderMark: {
            [MARKS.BOLD]: (text: ReactNode) => <strong>{text}</strong>,
            [MARKS.ITALIC]: (text: ReactNode) => <em>{text}</em>,
            [MARKS.UNDERLINE]: (text: ReactNode) => <u>{text}</u>,
            [MARKS.CODE]: (text: ReactNode) => <code>{text}</code>,
            [MARKS.SUBSCRIPT]: (text: ReactNode) => <sub>{text}</sub>,
            [MARKS.SUPERSCRIPT]: (text: ReactNode) => <sup>{text}</sup>,
        },
    };
};

export const RichTextContentParser = (content: RichTextContent) => {
    return documentToReactComponents(
        content.json,
        renderOptions(content.links),
    );
};
