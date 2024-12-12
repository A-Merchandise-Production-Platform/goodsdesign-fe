interface AreaPayload {
  name: string;
  position: string;
  code: string;
}

export interface CreateAreaPayload extends AreaPayload {}

export interface UpdateAreaPayload extends AreaPayload {}
