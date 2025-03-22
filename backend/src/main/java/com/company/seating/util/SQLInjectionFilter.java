package com.company.seating.util;

import java.util.regex.Pattern;

import org.springframework.stereotype.Component;

/**
 * Utility class to prevent SQL Injection attacks
 */
@Component
public class SQLInjectionFilter {

    private static final Pattern SQL_INJECTION_PATTERN = Pattern.compile(
            ".*((\\b(ALTER|CREATE|DELETE|DROP|EXEC(UTE){0,1}|INSERT|MERGE|SELECT|UPDATE|UNION)\\b)|(--)|(/\\*)|(%3B)|%27|%22|%3D|%3B|%27|%22|%3E|%3C|%3D|%2B|%7C|%7B|%7D|%5B|%5D|%3A|%09|%0A|%0D|%00|\\\"\\\"|\\'\\').*",
            Pattern.CASE_INSENSITIVE
    );

    /**
     * Check if the input contains potential SQL injection attempts
     * @param input String to check
     * @return true if input contains SQL injection attempts
     */
    public boolean containsSQLInjection(String input) {
        if (input == null) {
            return false;
        }
        return SQL_INJECTION_PATTERN.matcher(input).matches();
    }

    /**
     * Sanitize input to prevent SQL injection
     * @param input String to sanitize
     * @return Sanitized string
     */
    public String sanitize(String input) {
        if (input == null) {
            return null;
        }
        // Replace special characters
        return input.replaceAll("['\"\\\\;]", "");
    }
}
