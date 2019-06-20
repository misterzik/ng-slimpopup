import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scrollMagicFilter',
  pure: false
})
export class SlimPopScrollPipe implements PipeTransform {
  transform(
    items: any[],
    currentIndex: number,
    scrollSize: number
  ): any[] {

    currentIndex = currentIndex || 1;
    scrollSize = scrollSize || 10;
    const startIndex = (currentIndex - 1) * scrollSize;
    const endIndex = Math.min(startIndex + scrollSize - 1, items.length - 1);

    if (!items) {
      return [];
    }

    // if (!value || value.length == 0) return items;
    const filterItems = items.filter((item, index) => {
      return index <= endIndex;
    });

    if (filterItems.length > 3) {
      filterItems[filterItems.length - 3]['markHasScrolled'] = true;
      // console.warn(filterItems);
    } else {
      filterItems[filterItems.length - 1]['markHasScrolled'] = true;
      // console.warn(filterItems);
    }
    return filterItems;
  }
}
