/// <reference types="fabric" />

declare module 'fabric' {
  namespace fabric {
    interface Object extends ObjectProps {
      layer?: number;
    }

    interface ObjectProps {
      layer?: number;
    }

    interface IObjectOptions {
      layer?: number;
    }
  }
}