/**
 * This file is used to export all the integration tests.
 * Any class exported here will be returned by GET to the /tests/tests endpoint,
 * and can be run by POST to the /tests/tests endpoint.
 *
 * Beware to only export classes that extend the BaseTest class.
 */

export * from './addon.tests'
