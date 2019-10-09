module.exports = (sequelize, DataTypes) => {
  const Curtain = sequelize.define('Curtain', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
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
    }
  });

  Curtain.associate = () => {
    // My association code lives here
  };

  return Curtain;
};
