import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    super({
      errorFormat: 'minimal',
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

  cleanDb() {
    /* return this.$transaction([
      this.user.deleteMany(),
      this.creator.deleteMany(),
      this.collection.deleteMany(),
      this.asset.deleteMany(),
      this.assetCategories.deleteMany(),
      this.category.deleteMany(),
      this.submissionForm.deleteMany(),
      this.perk.deleteMany(),
      this.token.deleteMany(),
    ]); */
  }
}
