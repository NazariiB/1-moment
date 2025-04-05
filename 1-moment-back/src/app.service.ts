import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MomentEntity } from 'db/entity/moment.entity';
import { PinataSDK } from 'pinata';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(MomentEntity)
    private momentRepo: Repository<MomentEntity>,
  ) {}

  public async saveImage(file: Express.Multer.File, body: any) {
    console.log(body);

    try {
      const pinata = new PinataSDK({
        pinataJwt:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3ZWIyMGJlMC1jMjFiLTQwMGYtYjhlZi1lZGUxYjBmZjJjZGQiLCJlbWFpbCI6Im5hemlrYm9kbmEzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJiY2RkNTZlNmY3ODRhZjRiOGZjYyIsInNjb3BlZEtleVNlY3JldCI6IjJlYzYwNWE2YWNjODJkOGQ1OGNkYTkzNDNjYmI2OWVkNTcyYzFhOGNiNTdjYTM3YmM1MDY5YmRhODIxYWRlMTYiLCJleHAiOjE3NzUzNzY3MzV9.XgzxLdi2xyeXy4k2kqBjksOnEqO7Z5uoiYxLny9WAkM',
        pinataGateway: 'bcdd56e6f784af4b8fcc',
      });

      const convertedFile = new File([file.buffer], file.originalname, {
        type: 'image/png',
      });
      const upload = await pinata.upload.public.file(convertedFile);
      if (!upload || !upload.cid) {
        console.log('Upload error');

        return {
          success: false,
          error: 'Error uploading image',
        };
      }

      console.log('img: ', upload);

      const id = upload.cid;

      const metadata = {
        name: 'test data',
        description: 'test data',
        image: `${id}/${convertedFile.name}`,
        attributes: [],
      };

      const metadataRes = await pinata.upload.public.json(metadata);
      console.log('metadata: ', metadataRes);

      if (!metadataRes || !metadataRes.cid) {
        console.log('Upload error');

        return {
          success: false,
          error: 'Error uploading metadata',
        };
      }

      return {
        success: true,
        data: metadataRes.cid,
      };
    } catch (error) {
      console.error('Error saving image:', error);

      return {
        success: false,
        error: 'Error saving image',
      };
    }
  }
}
