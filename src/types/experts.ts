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

export type getCategoriesResponse = {
  children: Array<Categories>;
} & Categories;

type ProfileFile = {
  fileSize: string;
  fileUrl: string;
  originalFileName: string;
};

export type getExpertsResponse = {
  experts: Array<{
    consultingAreas: Array<{
      children: Array<{
        children: Array<{
          id: number;
          title: string;
        }>;
        id: number;
        title: string;
      }>;
      id: number;
      title: string;
    }>;
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
  }>;
  total: number;
};