import DataLoader from 'dataloader';
import DB from '../configs/dbConfig.js';

export const createCategoryLoader = () => {
  return new DataLoader(async (categoryIds: readonly number[]) => {
    const categories = await DB.category.findMany({
      where: {
        id: { in: [...categoryIds] },
      },
    });

    const categoryMap = new Map(categories.map((c) => [c.id, c]));

    return categoryIds.map((id) => categoryMap.get(id) || null);
  });
};
