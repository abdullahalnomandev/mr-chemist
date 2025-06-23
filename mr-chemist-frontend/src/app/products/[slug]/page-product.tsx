import Link from "next/link";

import { FaqSection } from "@/components/home/faq-section";
import { NewsletterSection } from "@/components/home/newsletter";
import { ProductImageGallery } from "@/components/products/product-image-gallery";
import { ProductPurchase } from "@/components/products/product-purchase";
import { faqData, newsletterData } from "@/lib/dummy-data/home-data";
import { notFound } from "next/navigation";

// Add a CSS module for the product description
import { getProductBySlug } from "@/lib/api/api-server";
import styles from "./product-description.module.css";

export default async function ProductPage({ slug }: { slug: string }) {
  const product = await getProductBySlug(slug);

  if (!product) return notFound();

  return (
    <main className="mb-12 space-y-4">
      {/* Breadcrumb */}
      <div className="bg-secondary py-4">
        <div className="container mx-auto max-w-6xl px-4 sm:px-16">
          <nav className="text-sm">
            <Link href="/treatments" className="hover:text-primary text-gray-600">
              Treatments
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href={`/treatments/${product.treatment.slug}`} className="hover:text-primary text-gray-600">
              {product.treatment?.name}
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-primary font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Display Section */}
      <div className="container mx-auto max-w-6xl px-4 sm:px-16">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <ProductImageGallery images={product.imageUrls || []} />

          <ProductPurchase
            id={product._id}
            name={product.name}
            subtitle={product.name}
            treatmentSlug={product.treatment.slug}
            basePrice={product?.basePrice}
            rating={{ score: 5, count: 1736 }}
            variants={product?.variants as []}
            needConsultation={product.needConsultation}
            imageUrl={product.imageUrls?.[0] ?? ""}
            questionsId={product.treatment?.questionsId}
          />
        </div>

        <div className="mt-12">
          <h1 className="mb-2 text-center text-2xl font-semibold">About {product.name}</h1>
          {/* Apply the CSS module class to the description container */}
          <div className={styles.productDescription} dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
      </div>

      <FaqSection title={faqData.title} description={faqData.subtitle} faqs={faqData.faqs} />

      <NewsletterSection
        title={newsletterData.title}
        description={newsletterData.subtitle}
        buttonText={newsletterData.buttonText}
      />
    </main>
  );
}
