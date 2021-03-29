export const size = {
    mobile: 767,
    tablet: 1023,
    laptop: 1660,
}

export const theme = {
     mobile: `(max-width: ${size.mobile}px)`,
     tablet: `(max-width: ${size.tablet}px)`,
     laptop: `(max-width: ${size.laptop}px)`,
     onlymobile: `(max-width: ${size.mobile}px)`,
     onlytablet: `(min-width: ${size.mobile}px) and (max-width: ${size.tablet}px)`,
     onlylaptop: `(min-width: ${size.tablet}px) and (max-width: ${size.laptop}px)`,
}