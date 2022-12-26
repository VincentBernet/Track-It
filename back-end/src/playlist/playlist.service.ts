import { Injectable } from '@nestjs/common';
import { playlistListType } from './playlist.dto';

@Injectable()
export class PlaylistService {
  getAllPlaylist(): playlistListType {
    return [{ name: 'Relaxation' }, { name: 'Workout' }];
  }
}
