import { RequestHandler } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PaymentServices } from './payment.service';

const createPaymentIntent: RequestHandler = catchAsync(async (req, res) => {
  const { price } = req.body;
  const clientSecret = await PaymentServices.createPaymentIntent(price);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Payment intent created successfully',
    data: { clientSecret },
  });
});

export const PaymentControllers = {
  createPaymentIntent,
};
