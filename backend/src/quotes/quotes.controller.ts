import { UseGuards,Controller, Get } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { QuotesService } from "./quotes.service";

@UseGuards(AuthGuard)
@Controller('quotes')
export class QuotesController {
  constructor(private quotesService: QuotesService) {}

  @Get('all_quotes')
  async getQuotes() {
    //   console.log('🔥 QuotesController is working');
    try {
        const quotes_data = await this.quotesService.getQuotes();
        console.log("Quotes: ", quotes_data);
        
        return {
            message: "All quotes fetched successfully",
            quotes_data
        };
    } catch (error) {
        return {
            message: `Failed to get quotes`
        }
    }
  }

}
