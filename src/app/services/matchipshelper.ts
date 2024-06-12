import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { Tag } from '../models/tag';

export class MatChipsHelper {
    tagList!: Tag[]
    constructor() {
        if (!this.tagList)
            this.tagList = []
    }
    add(event: MatChipInputEvent): void {
        debugger
        const value = (event.value || '').trim();

        if (!this.tagList)
            this.tagList = []
        // Add our fruit
        if (value) {
            this.tagList.push({ name: value });
        }

        // Clear the input value
        event.chipInput!.clear();
    }

    remove(tag: Tag): void {
        if (!this.tagList)
            this.tagList = []

        const index = this.tagList.indexOf(tag);

        if (index >= 0) {
            this.tagList.splice(index, 1);

        }
    }

    edit(tag: Tag, event: MatChipEditedEvent) {

        if (!this.tagList)
            this.tagList = []

        const value = event.value.trim();

        // Remove fruit if it no longer has a name
        if (!value) {
            this.remove(tag);
            return;
        }

        // Edit existing fruit
        const index = this.tagList.indexOf(tag);
        if (index >= 0) {
            this.tagList[index].name = value;
        }
    }
}