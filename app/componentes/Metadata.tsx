// Meta.tsx

import { Metadata } from 'next';

export interface MetaProps {
  metadata: Metadata;
}

export default function Meta({ metadata }: MetaProps) {
  return (
    <>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
      {/* Agrega más metadatos aquí según sea necesario */}
    </>
  );
}
