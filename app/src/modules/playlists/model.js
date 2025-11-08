async function getUserPlaylists(userId) {
  const query = `
    SELECT
      PLAYLISTS.ID,
      PLAYLISTS.TITLE
    FROM
      PLAYLISTS
    INNER JOIN
      USERS
    ON
      USERS.ID = PLAYLISTS.USER_ID
    WHERE
      USER_ID = $1
  `;
  
  const res = await client.query(query, [userId]);
  console.log(res);
  return res;
}

async function getPlaylistTracks(playlistId) {
  const query = `
    SELECT
      PLAYLISTS_TRACKS.ID,
      PLAYLISTS_TRACKS.TITLE
    FROM
      PLAYLISTS_TRACKS
    INNER JOIN 
      PLAYLISTS
    ON
      PLAYLISTS.ID = PLAYLISTS_TRACKS.PLAYLIST_ID
    WHERE
      PLAYLISTS.ID = $1
  `;
  const res = await client.query(query, [playlistId]);
  return res;
}

async function getPlaylist(playlistId) {
  const query = `
    SELECT
      ID,
      TITLE
    FROM 
      PLAYLISTS
    WHERE
      ID = $1
  `;
  const res = await client.query(query, [playlistId]);
  
  const tracks = await getPlaylistTracks(playlistId);
  console.log(tracks);
  console.log(res);
}

module.exports = {
  getUserPlaylists,
  getPlaylist,
  getPlaylistTracks,
}
