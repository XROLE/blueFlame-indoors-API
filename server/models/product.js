module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      unique: false
    },
    name: {
      type: DataTypes.STRING,
      unique: false
    },
    description: {
      type: DataTypes.STRING,
      unique: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: false
    },
    image: {
      type: DataTypes.STRING
    },
    slide: {
      type: DataTypes.BOOLEAN
    },
  });

  Product.associate = () => {
    // My association code lives here
  };

  return Product;
};
