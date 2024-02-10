import { parser } from './example-parser.js';
import { LRLanguage } from '@codemirror/language';

export const language = LRLanguage.define({
  parser,
});
