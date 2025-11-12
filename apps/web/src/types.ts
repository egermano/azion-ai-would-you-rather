export interface Question {
  id: number;
  question: string;
  optionA: string;
  optionB: string;
  theme: string;
  difficulty: string;
}

export interface Answer {
  questionId: number;
  selectedOption: 'A' | 'B';
  question: Question;
}

export interface ApiResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
      refusal: null;
      annotations: null;
      audio: null;
      function_call: null;
      tool_calls: any[];
      reasoning_content: null;
    };
    logprobs: null;
    finish_reason: string;
    stop_reason: null;
  }>;
  service_tier: null;
  system_fingerprint: null;
  usage: {
    prompt_tokens: number;
    total_tokens: number;
    completion_tokens: number;
    prompt_tokens_details: null;
  };
  prompt_logprobs: null;
  kv_transfer_params: null;
}

export interface DilemmaData {
  optionA: string;
  optionB: string;
  theme: string;
  difficulty: string;
}
