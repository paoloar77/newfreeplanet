export namespace Validators {
  const Regs = {
    link: /(https?|ftp):\/\/(-\.)?([^\s/?#-]+\.?)+(\/[^\s]*)?@iS/,
  }

  // @ts-ignore
  export const LinkValidator = (value, component) => Regs.link.test(value)
}
