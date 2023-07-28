'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Users',[{
      email: 'admin@gmail.com',
      password: '123456',
      firstName: 'Hao',
      lastName: 'Ket',
      address: 'Hue',
      gender: 1,
      typeRole: 'ROLE',
      keyRole:'R1'
    }])



  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
