export interface SearchParam {
    page?: number;
    pageSize?: number;
    searchValue?: string;
    sortBy?: string;
    sortDirection?: 'ASC' | 'DESC';
}

export interface SearchParamBranch extends SearchParam {
    retailer?: string;
}

export interface SearchParamProduct extends SearchParam {
    idBranch?: string;
    idCategory?: string;
    key?: string;
    state?: string;
    isIngredient?: boolean;
    sortBy?: any;
}

export interface SearchParamLogViewProduct extends SearchParam {
    fromDate?: Date;
    toDate?: Date;
    idCategory?: string;
    sortBy?: any;
    isExport?: boolean;
    isShowMore?: boolean;
}

export interface SearchParamIngredient extends SearchParam {
    allergenId: string;
}

export interface SearchParamLogViewProductByUpc extends SearchParamLogViewProduct {
    upc: string;
}

export interface FindAndCountSequelizeResponse<T> {
    rows: T[];
    count: number;
    page: number;
}

export interface CreateAllergenIngredientParams {
    allergenId: string;
    ingredientId: string;
}
