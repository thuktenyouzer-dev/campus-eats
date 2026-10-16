const { isValidSherubtseEmail } = require('./validators');

describe('isValidSherubtseEmail', () => {
  it('accepts a properly formatted Sherubtse email', () => {
    expect(isValidSherubtseEmail('kharka.sherubtse@rub.edu.bt')).toBe(true);
  });

  it('rejects a gmail address', () => {
    expect(isValidSherubtseEmail('kharka@gmail.com')).toBe(false);
  });

  it('is case-insensitive on the domain', () => {
    expect(isValidSherubtseEmail('kharka.SHERUBTSE@RUB.EDU.BT')).toBe(true);
  });

  it('rejects an empty string', () => {
    expect(isValidSherubtseEmail('')).toBe(false);
  });
});
const EMAIL_SUFFIX = '.sherubtse@rub.edu.bt';

function isValidSherubtseEmail(email) {
  if (!email) return false;
  return email.toLowerCase().endsWith(EMAIL_SUFFIX);
}

module.exports = { isValidSherubtseEmail, EMAIL_SUFFIX };
