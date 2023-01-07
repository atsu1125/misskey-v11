import emojilistjson from '../../../../emojilist.json';

export const unicodeEmojiCategories = ['face', 'people', 'animals_and_nature', 'food_and_drink', 'activity', 'travel_and_places', 'objects', 'symbols', 'flags'] as const;

export type UnicodeEmojiDef = {
	category: typeof unicodeEmojiCategories[number];
	char: string;
	name: string;
	keywords: string[];
}

export const emojilist = emojilistjson as UnicodeEmojiDef[];

export function getEmojiName(char: string): string | undefined {
	return emojilist.find(emoji => emoji.char === char)?.name;
}
