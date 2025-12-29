'use client';

import { createEdgeStoreProvider } from '@edgestore/react';
import type { EdgeStoreRouter } from '@/app/api/edgestore/[...edgestore]/route';

const {
  EdgeStoreProvider,
  useEdgeStore: _useEdgeStore,
} = createEdgeStoreProvider<EdgeStoreRouter>();

function useEdgeStore() {
  const store = _useEdgeStore();

  if (!store) {
    throw new Error('useEdgeStore must be used within <EdgeStoreProvider>');
  }

  return store;
}

export { EdgeStoreProvider, useEdgeStore };
