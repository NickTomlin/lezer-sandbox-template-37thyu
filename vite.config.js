import { defineConfig } from 'vite';
import { run } from 'vite-plugin-run';

export default defineConfig({
  plugins: [
    run([
      {
        name: 'rebuild codemirror grammar',
        run: [
          'lezer-generator',
          './languages/example.grammar',
          '-o',
          './languages/example-parser.js',
        ],
        pattern: ['./languages/example.grammar'],
      },
    ]),
  ],
});
