import React from 'react';
import Filter from "@morningtrain/react-filters/Filter";

const PaginationLayout = require("layouts/Pagination");

export default class Pagination extends Filter {

    get page() {
        let page = this.value["$page"];
        if (page) {
            return page;
        }
        return 1;
    }

    get pages() {
        if (this.operation) {
            let pages = this.operation.getMeta("filters.pagination.pages", 1);
            if (pages === null) {
                pages = 1;
            }
            return pages;
        }
        return 1;
    }

    get constraint() {
        return ['$page'];
    }

    changePage = (page) => {
        if (this.page !== page) {
            this.constrain({'$page': page});
        }
    }

    /////////////////////////////////
    // Renders
    /////////////////////////////////

    render() {
        return (
            <PaginationLayout page={this.page} pages={this.pages} onChange={this.changePage}/>
        );
    }

}

export const Injected = Pagination.inject();
