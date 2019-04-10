// Reexport for backward-compatibility purposes
import { clientStorage } from '@restapp/core-common';
const { getItem, setItem, removeItem } = clientStorage;
export { getItem, setItem, removeItem };
