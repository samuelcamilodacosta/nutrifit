import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getNutriFitAiResponse,
  formatAssistantMessage,
  getApiKey,
} from './nutrifitAi';

describe('nutrifitAi', () => {
  describe('formatAssistantMessage', () => {
    it('should parse simple text without bold', () => {
      const text = 'Hello world';
      const result = formatAssistantMessage(text);

      expect(result).toHaveLength(1);
      expect(result[0].parts).toHaveLength(1);
      expect(result[0].parts[0]).toEqual({
        bold: false,
        text: 'Hello world',
        key: 0,
      });
    });

    it('should parse text with bold formatting', () => {
      const text = 'Hello **bold** world';
      const result = formatAssistantMessage(text);

      expect(result).toHaveLength(1);
      expect(result[0].parts).toContainEqual(
        expect.objectContaining({
          bold: true,
          text: 'bold',
        })
      );
    });

    it('should handle multiple bold segments', () => {
      const text = '**Bold1** text **Bold2** more';
      const result = formatAssistantMessage(text);

      expect(result[0].parts).toHaveLength(5);
      const boldParts = result[0].parts.filter(p => p.bold);
      expect(boldParts).toHaveLength(2);
    });

    it('should handle multiple lines', () => {
      const text = 'Line 1\nLine 2\nLine 3';
      const result = formatAssistantMessage(text);

      expect(result).toHaveLength(3);
      expect(result[0].parts[0].text).toBe('Line 1');
      expect(result[1].parts[0].text).toBe('Line 2');
      expect(result[2].parts[0].text).toBe('Line 3');
    });

    it('should handle multiline with bold on first line', () => {
      const text = '**Important** text\nNormal\nMore';
      const result = formatAssistantMessage(text);

      expect(result).toHaveLength(3);
      expect(result[0].parts.some(p => p.bold && p.text === 'Important')).toBe(true);
    });

    it('should handle empty lines', () => {
      const text = 'Line 1\n\nLine 3';
      const result = formatAssistantMessage(text);

      expect(result).toHaveLength(3);
      expect(result[1].parts[0].text).toBe('');
    });

    it('should handle edge case with consecutive bold markers', () => {
      const text = '**bold** **another**';
      const result = formatAssistantMessage(text);

      expect(result[0].parts).toContainEqual(
        expect.objectContaining({
          bold: true,
          text: 'bold',
        })
      );
      expect(result[0].parts).toContainEqual(
        expect.objectContaining({
          bold: true,
          text: 'another',
        })
      );
    });

    it('should assign unique keys', () => {
      const text = 'Part1\nPart2\nPart3';
      const result = formatAssistantMessage(text);

      const keys = result.map(r => r.key);
      expect(keys).toEqual([0, 1, 2]);
    });
  });

  describe('getNutriFitAiResponse', () => {
    beforeEach(() => {
      global.fetch = vi.fn();
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    it('should throw error when API key is missing', async () => {
      const messages = [{ role: 'user', text: 'Hello' }];

      await expect(
        getNutriFitAiResponse(messages, 'pt', null)
      ).rejects.toThrow('Chave de API ausente');
    });

    it('should handle successful API response', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          choices: [
            {
              message: {
                content: 'Test response',
              },
            },
          ],
        }),
      });

      const messages = [{ role: 'user', text: 'Hello' }];
      const response = await getNutriFitAiResponse(messages, 'pt', 'test-key');

      expect(response).toBe('Test response');
      expect(global.fetch).toHaveBeenCalledWith(
        'https://api.groq.com/openai/v1/chat/completions',
        expect.any(Object)
      );
    });

    it('should handle error responses', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({
          error: { message: 'Internal error' },
        }),
      });

      const messages = [{ role: 'user', text: 'Hello' }];

      await expect(
        getNutriFitAiResponse(messages, 'pt', 'test-key')
      ).rejects.toThrow();
    });

    it('should return trimmed response text', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          choices: [
            {
              message: {
                content: '  Test response with spaces  ',
              },
            },
          ],
        }),
      });

      const messages = [{ role: 'user', text: 'Hello' }];
      const response = await getNutriFitAiResponse(messages, 'pt', 'test-key');

      expect(response).toBe('Test response with spaces');
    });
  });
});
