export interface Content {
  audio_path: string;
  text: string;

  next_content?: string;
  next_delay?: number;

  present_input?: boolean;
  input_text?: string;
  show_input?: boolean;
  storage_tag?: string;

  has_tags?: boolean;
}
