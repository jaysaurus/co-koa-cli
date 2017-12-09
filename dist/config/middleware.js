module.exports = function ($, conf) {
  const TextBlock = $('TextBlock');
  return {
    'example': async (ctx, next) => {
      const start = new Date();
      ctx.body = `${start} request received.`;
      await next();
      const ms = new Date() - start;
      const textBlock = await new TextBlock({ text: 'I was made in middleware!' }).save();
      $.logger.log(textBlock);
      $.logger.log(`${ctx.method} ${ctx.url} - ${ms}`);
    }
  };
};
