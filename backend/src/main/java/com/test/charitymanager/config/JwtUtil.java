// package com.test.charitymanager.config;

// import java.util.Date;
// import java.util.concurrent.TimeUnit;

// import javax.servlet.http.HttpServletRequest;

// import org.springframework.stereotype.Component;

// import com.test.charitymanager.model.User;

// import io.jsonwebtoken.Claims;
// import io.jsonwebtoken.ExpiredJwtException;
// import io.jsonwebtoken.JwtParser;
// import io.jsonwebtoken.Jwts;
// import io.jsonwebtoken.SignatureAlgorithm;

// @Component
// public class JwtUtil {
// private final String SECRET_KEY = "secret";
// private long accessTokenValidity = 60 * 60 * 1000;

// private final String TOKEN_HEADER = "Authorization";
// private final String TOKEN_PREFIX = "Bearer ";

// private final JwtParser jwtParser;

// public JwtUtil() {
// jwtParser = Jwts.parser().setSigningKey(SECRET_KEY);
// }

// public String createToken(User user) {
// Claims claims = Jwts.claims().setSubject(user.getEmail());
// Date tokenCreationDate = new Date();
// Date tokenExpiryDate = new Date(tokenCreationDate.getTime() +
// TimeUnit.MINUTES.toMillis(accessTokenValidity));
// return Jwts.builder()
// .setClaims(claims)
// .setExpiration(tokenExpiryDate)
// .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
// .compact();
// }

// private Claims parseJwtClaims(String token) {
// return jwtParser.parseClaimsJwt(token).getBody();
// }

// public Claims resolveClaims(HttpServletRequest req) {
// try {
// String token = resolveToken(req);
// if (token != null) {
// return parseJwtClaims(token);
// }
// return null;
// } catch (ExpiredJwtException ex) {
// req.setAttribute("expired", ex.getMessage());
// throw ex;
// } catch (Exception ex) {
// req.setAttribute("invalid", ex.getMessage());
// throw ex;
// }
// }

// public String resolveToken(HttpServletRequest req) {
// String bearerToken = req.getHeader(TOKEN_HEADER);
// if (bearerToken != null && bearerToken.startsWith(TOKEN_PREFIX)) {
// return bearerToken.substring(TOKEN_PREFIX.length());
// }
// return null;
// }
// }
