export type Categories = {
  content: {
    certificates: Array<string>;
    menuImage: string;
    postTitle: string;
  } | null;
  id: number;
  isLeaf: boolean;
  isPending: boolean;
  isSub: boolean;
  parentId: number | null;
  title: string;
};

export type GetCategoriesResponse = {
  children: Array<Categories>;
} & Categories;

export type ProfileFile = {
  fileSize: string;
  fileUrl: string;
  originalFileName: string;
};

export type KeywordType = {
  id: number;
  title: string;
};

export type Expert = {
  consultingAreas: Array<
    {
      children: Array<
        {
          children: Array<KeywordType>;
        } & KeywordType
      >;
    } & KeywordType
  >;
  createAt: string;
  deletedAt: string | null;
  fastestAvailable: {
    date: string;
    index: number;
  };
  needSync: boolean;
  productCount: number;
  profileImages: {
    large: ProfileFile;
    small: ProfileFile;
  };
  rateAvg: string;
  rateTotal: number;
  reviewCount: number;
  sessionCount: number;
  shortestSessionLength: number;
  title: string;
  updatedAt: string;
  uuid: string;
};

export type GetExpertsResponse = {
  experts: Array<Expert>;
  total: number;
};

export type GetExpertPayload = {
  count: number;
  page: number;
  isAvailable?: string;
  sortBy?: string;
  leafIds?: number;
};