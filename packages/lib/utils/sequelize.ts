import Sequelize from 'sequelize';

export const page = (page?: number, size?: number) => {
  return {
    offset: page && size ? (page - 1) * size : undefined,
    limit: size || undefined,
  };
};

export const order = (sort?: string, order?: string) => {
  if (sort && (order === 'desc' || order === 'asc')) {
    return {
      order: [[sort, order]] as any,
    };
  }
  return {};
};

export const where = <T extends { [x: string | number]: any }>(
  opts: T = {} as any
) => {
  const result = {} as T;
  for (const key in opts) {
    const value = opts[key];
    if (value !== undefined) {
      result[key] = value;
    }
  }
  return result;
};

export const like = <T>(value?: T) => {
  if (value) {
    return {
      [Sequelize.Op.like]: `%${value}%`,
    };
  }
};

export const inOp = <T extends any[]>(value: T = [] as any) => {
  const list = value.filter((t) => t !== undefined) as T;
  if (list.length) {
    return {
      [Sequelize.Op.in]: list,
    };
  }
};

export const between = <T extends any[]>(value: T = [] as any) => {
  const result: any = {};
  const [left, right] = value;
  if (left === undefined && right === undefined) {
    return;
  }
  if (left !== undefined) {
    result[Sequelize.Op.gte] = left;
  }
  if (right !== undefined) {
    result[Sequelize.Op.lte] = right;
  }
  return result;
};

export const catchUnique =
  (stringMap: Record<string, string>) =>
  (err: Sequelize.UniqueConstraintError) => {
    if (err.name === 'SequelizeUniqueConstraintError') {
      const { fields } = err;
      for (const key in fields) {
        const result = stringMap[key];
        if (result) {
          throw new Error(result);
        }
      }
    }
    throw err;
  };
