import { AdsFromEbayModel } from '../../api/models';

/**
 * Funktion welche eine Anzeige aus der Datenbank abfragt
 * @param {string} id - ID einer anzeige
 * @return {Promise<Ad>} Gibt eine Anzeige aus der Datenbank zurück
 */
export const findByIdEbay = (id: string) =>
  AdsFromEbayModel.findById(id).exec();
