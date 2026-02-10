import { useEffect } from "react";

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const SITE_URL = "https://a1tradelines.lovable.app";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

const upsertMeta = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
};

const upsertLink = (rel: string, href: string) => {
  let link = document.head.querySelector(`link[rel=\"${rel}\"]`) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.rel = rel;
    document.head.appendChild(link);
  }
  link.href = href;
};

const Seo = ({ title, description, path = "/", image = DEFAULT_IMAGE, noindex = false, jsonLd }: SeoProps) => {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${path}`;

    document.title = title;
    upsertMeta("meta[name='description']", { name: "description", content: description });
    upsertMeta("meta[name='robots']", { name: "robots", content: noindex ? "noindex, nofollow" : "index, follow" });
    upsertLink("canonical", canonicalUrl);

    upsertMeta("meta[property='og:type']", { property: "og:type", content: "website" });
    upsertMeta("meta[property='og:title']", { property: "og:title", content: title });
    upsertMeta("meta[property='og:description']", { property: "og:description", content: description });
    upsertMeta("meta[property='og:url']", { property: "og:url", content: canonicalUrl });
    upsertMeta("meta[property='og:image']", { property: "og:image", content: image });

    upsertMeta("meta[name='twitter:card']", { name: "twitter:card", content: "summary_large_image" });
    upsertMeta("meta[name='twitter:title']", { name: "twitter:title", content: title });
    upsertMeta("meta[name='twitter:description']", { name: "twitter:description", content: description });
    upsertMeta("meta[name='twitter:image']", { name: "twitter:image", content: image });

    const existing = document.getElementById("seo-jsonld");
    if (existing) {
      existing.remove();
    }

    if (jsonLd) {
      const script = document.createElement("script");
      script.id = "seo-jsonld";
      script.type = "application/ld+json";
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      if (jsonLd) {
        document.getElementById("seo-jsonld")?.remove();
      }
    };
  }, [title, description, path, image, noindex, jsonLd]);

  return null;
};

export default Seo;
