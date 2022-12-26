import { Injectable } from '@nestjs/common';

@Injectable()
export class PlaylistService {
    getAllPlaylist(): string {
        return 'This action returns all playlist';
    }
}
