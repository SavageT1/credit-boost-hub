import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Share2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

interface BlogPostData {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  meta_description: string | null;
  published_at: string;
}

// Separate component for sanitized content to ensure proper memoization
const SanitizedContent = ({ content }: { content: string }) => {
  const sanitizedContent = useMemo(() => {
    return DOMPurify.sanitize(content, {
      ALLOWED_TAGS: ['h2', 'h3', 'h4', 'p', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'br', 'span'],
      ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
      ALLOW_DATA_ATTR: false,
    });
  }, [content]);

  return (
    <div 
      className="prose prose-invert prose-lg max-w-none
        prose-headings:font-display prose-headings:text-primary
        prose-p:text-foreground/80 prose-p:leading-relaxed
        prose-li:text-foreground/80
        prose-a:text-primary prose-a:no-underline hover:prose-a:underline
        prose-strong:text-foreground"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (error) {
        console.error("Error fetching post:", error);
      } else {
        setPost(data);
      }
      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.excerpt,
          url,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Link Copied",
        description: "Article link copied to clipboard",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 md:pt-32">
          <div className="max-w-3xl mx-auto px-4 sm:px-8 py-16">
            <div className="animate-pulse">
              <div className="h-10 bg-muted rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-muted rounded w-1/4 mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
                <div className="h-4 bg-muted rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 md:pt-32">
          <div className="max-w-3xl mx-auto px-4 sm:px-8 py-16 text-center">
            <h1 className="text-3xl font-display text-primary mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist or has been removed.</p>
            <Link to="/blog">
              <Button className="font-display">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.meta_description || post.excerpt,
    datePublished: post.published_at,
    author: {
      "@type": "Organization",
      name: "A1 Tradelines",
    },
    publisher: {
      "@type": "Organization",
      name: "A1 Tradelines",
      logo: {
        "@type": "ImageObject",
        url: "https://a1tradelines.lovable.app/favicon-192.png",
      },
    },
    mainEntityOfPage: `https://a1tradelines.lovable.app/blog/${post.slug}`,
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={`${post.title} | A1 Tradelines Blog`}
        description={post.meta_description || post.excerpt}
        path={`/blog/${post.slug}`}
        jsonLd={articleSchema}
      />
      <Navbar />
      <main className="pt-24 md:pt-32">
        {/* Header */}
        <section className="py-8 md:py-12 px-4 sm:px-8 gradient-dark">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <Link to="/blog" className="inline-flex items-center text-primary hover:underline mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
            <h1 className="text-3xl md:text-5xl font-display text-primary text-glow mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-[hsl(var(--on-dark))] opacity-70">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {formatDate(post.published_at)}
              </span>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-8 md:py-12 px-4 sm:px-8">
          <article className="max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '150ms' }}>
            <SanitizedContent content={post.content} />

            {/* Disclaimer */}
            <div className="mt-12 p-6 bg-muted/20 rounded-lg border border-border">
              <p className="text-sm text-foreground/60">
                <strong className="text-foreground/80">Disclaimer:</strong> Results vary depending on your credit report and lender requirements. 
                A1 Tradelines is not affiliated with credit bureaus or lenders. No score increase is guaranteed.
              </p>
            </div>
          </article>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 px-4 sm:px-8 gradient-dark">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="text-3xl font-display text-primary mb-4">
              Have Questions About Your Credit?
            </h2>
            <p className="text-[hsl(var(--on-dark))] opacity-80 mb-8">
              Get a free assessment to learn how tradelines may help your situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="font-display box-glow" data-cta="assessment">
                  Start Free Assessment
                </Button>
              </Link>
              <a href="tel:9087675309">
                <Button variant="outline" className="font-display border-primary text-primary hover:bg-primary hover:text-primary-foreground" data-cta="call">
                  Call (908) 767-5309
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;