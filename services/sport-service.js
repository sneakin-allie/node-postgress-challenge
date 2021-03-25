const SportsService = {
    getSports(db) {
      return db
        .from('sport')
        .select(
          'sport.id',
          'sport.name',
          'sport.players',
        );
    },
    deleteSport(db, sport_id) {
      return db('sport')
        .where({'id': sport_id})
        .delete()
    },
    getSportsById(db, sport_id) {
      return db('sport')
        .where({'id': sport_id})
    }
  }
  
  module.exports = {
      SportsService
  };