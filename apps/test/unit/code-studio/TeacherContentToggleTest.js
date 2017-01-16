import { assert } from 'chai';
import { TeacherContentToggle } from '@cdo/apps/code-studio/components/TeacherContentToggle';
import { throwOnConsoleErrors } from '../../util/testUtils';
import { shallow, mount } from 'enzyme';
import React from 'react';
import $ from 'jquery';

describe('TeacherContentToggle', () => {
  throwOnConsoleErrors();

  let div, renderElement;
  beforeEach(() => {
    // add DOM elements that our tecaher content toggle is going to take control
    // over
    div = $(`
      <div style="display: none">
        <div id="locked-stage" style="display: none">FakeLockedStage</div>
        <div id="hidden-stage" style="display: none">FakeHiddenStage</div>
        <div id="level-body" style="visibility: hidden">FakeLevelBody</div>
      </div>
    `).appendTo(document.body);

    // simulate the same way we render into the document in teacher.js
    const levelContent = $('#level-body');
    renderElement = $('<div/>').insertAfter(levelContent)[0];
  });

  afterEach(() => {
    div.remove();
    renderElement = null;
  });

  it('takes ownership of locked-stage, hidden-stage, and level-body elements', () => {
    const component = mount(
      <TeacherContentToggle
        isBlocklyOrDroplet={true}
        viewAs="Teacher"
        hiddenStagesInitialized={false}
        sectionsAreLoaded={false}
        isHiddenStage={false}
        isLockedStage={false}
      />,
      { attachTo: renderElement });

    const root = $(component.html());
    assert.equal(root.children().length, 3);

    // Each child element is a wrapper around the original DOM element, and
    // has unhidden the original DOM element
    const [contentElement, lockedStageElement, hiddenStageElement] = root.children().toArray();

    assert.equal(contentElement.childNodes[0].getAttribute('id'), 'level-body');
    assert.equal(contentElement.childNodes[0].style.display, '');

    assert.equal(lockedStageElement.childNodes[0].getAttribute('id'), 'locked-stage');
    assert.equal(lockedStageElement.childNodes[0].style.display, '');

    assert.equal(hiddenStageElement.childNodes[0].getAttribute('id'), 'hidden-stage');
    assert.equal(hiddenStageElement.childNodes[0].style.display, '');
  });

  it('shows content immediately when viewAs Teacher', () => {
    const component = mount(
      <TeacherContentToggle
        isBlocklyOrDroplet={true}
        viewAs="Teacher"
        hiddenStagesInitialized={false}
        sectionsAreLoaded={false}
        isHiddenStage={false}
        isLockedStage={false}
      />,
      { attachTo: renderElement });

    const root = $(component.html());
    const [contentElement, lockedStageElement, hiddenStageElement] = root.children().toArray();

    assert.equal(contentElement.style.display, '');
    assert.equal(contentElement.style.visibility, '');
    assert.equal(lockedStageElement.style.display, 'none');
    assert.equal(hiddenStageElement.style.display, 'none');
  });

  it('does not initially show anything when viewAs Student', () => {
    const component = mount(
      <TeacherContentToggle
        isBlocklyOrDroplet={true}
        viewAs="Student"
        hiddenStagesInitialized={false}
        sectionsAreLoaded={false}
        isHiddenStage={false}
        isLockedStage={false}
      />,
      { attachTo: renderElement });

    const root = $(component.html());
    const [contentElement, lockedStageElement, hiddenStageElement] = root.children().toArray();

    // nothing visible
    assert.equal(contentElement.style.display, '');
    assert.equal(contentElement.style.visibility, 'hidden');
    assert.equal(lockedStageElement.style.display, 'none');
    assert.equal(hiddenStageElement.style.display, 'none');
  });

  it('does show hidden stage message once initialized when viewAs Student', () => {
    const component = mount(
      <TeacherContentToggle
        isBlocklyOrDroplet={true}
        viewAs="Student"
        hiddenStagesInitialized={false}
        sectionsAreLoaded={false}
        isHiddenStage={false}
        isLockedStage={false}
      />,
      { attachTo: renderElement });

    component.setProps({
      hiddenStagesInitialized: true,
      isHiddenStage: true
    });

    let root = $(component.html());
    let [contentElement, lockedStageElement, hiddenStageElement] = root.children().toArray();

    // content is hidden, hiddenStage is visible
    assert.equal(contentElement.style.display, '');
    assert.equal(contentElement.style.visibility, 'hidden');
    assert.equal(lockedStageElement.style.display, 'none');
    assert.equal(hiddenStageElement.style.display, '');

    component.setProps({
      isBlocklyOrDroplet: false
    });
    root = $(component.html());
    [contentElement, lockedStageElement, hiddenStageElement] = root.children().toArray();
    // same thing, but we also set display:none on content
    assert.equal(contentElement.style.display, 'none');
    assert.equal(contentElement.style.visibility, 'hidden');
    assert.equal(lockedStageElement.style.display, 'none');
    assert.equal(hiddenStageElement.style.display, '');
  });

  it('does show locked stage message once initialized when viewAs Student', () => {
    const component = mount(
      <TeacherContentToggle
        isBlocklyOrDroplet={true}
        viewAs="Student"
        hiddenStagesInitialized={false}
        sectionsAreLoaded={false}
        isHiddenStage={false}
        isLockedStage={false}
      />,
      { attachTo: renderElement });

    component.setProps({
      sectionsAreLoaded: true,
      isLockedStage: true
    });

    let root = $(component.html());
    let [contentElement, lockedStageElement, hiddenStageElement] = root.children().toArray();

    // content is hidden, hiddenStage is visible
    assert.equal(contentElement.style.display, '');
    assert.equal(contentElement.style.visibility, 'hidden');
    assert.equal(lockedStageElement.style.display, '');
    assert.equal(hiddenStageElement.style.display, 'none');

    component.setProps({
      isBlocklyOrDroplet: false
    });
    root = $(component.html());
    [contentElement, lockedStageElement, hiddenStageElement] = root.children().toArray();
    // same thing, but we also set display:none on content
    assert.equal(contentElement.style.display, 'none');
    assert.equal(contentElement.style.visibility, 'hidden');
    assert.equal(lockedStageElement.style.display, '');
    assert.equal(hiddenStageElement.style.display, 'none');
  });

  it('shows hidden message when viewAs student if locked and hidden', () => {
    const component = mount(
      <TeacherContentToggle
        isBlocklyOrDroplet={true}
        viewAs="Student"
        hiddenStagesInitialized={false}
        sectionsAreLoaded={false}
        isHiddenStage={false}
        isLockedStage={false}
      />,
      { attachTo: renderElement });

    component.setProps({
      sectionsAreLoaded: true,
      isLockedStage: true,
      hiddenStagesInitialized: true,
      isHiddenStage: true
    });

    const root = $(component.html());
    const [contentElement, lockedStageElement, hiddenStageElement] = root.children().toArray();

    // content is hidden, hiddenStage is visible
    assert.equal(contentElement.style.display, '');
    assert.equal(contentElement.style.visibility, 'hidden');
    assert.equal(lockedStageElement.style.display, 'none');
    assert.equal(hiddenStageElement.style.display, '');

    component.setProps({
      isBlocklyOrDroplet: false
    });
  });

  it('shows content after async calls if neither locked nor hidden', () => {
    const component = mount(
      <TeacherContentToggle
        isBlocklyOrDroplet={true}
        viewAs="Student"
        hiddenStagesInitialized={false}
        sectionsAreLoaded={false}
        isHiddenStage={false}
        isLockedStage={false}
      />,
      { attachTo: renderElement });

    component.setProps({
      sectionsAreLoaded: true,
      isLockedStage: false,
      hiddenStagesInitialized: true,
      isHiddenStage: false
    });

    const root = $(component.html());
    const [contentElement, lockedStageElement, hiddenStageElement] = root.children().toArray();

    // content is hidden, hiddenStage is visible
    assert.equal(contentElement.style.display, '');
    assert.equal(contentElement.style.visibility, '');
    assert.equal(lockedStageElement.style.display, 'none');
    assert.equal(hiddenStageElement.style.display, 'none');

    component.setProps({
      isBlocklyOrDroplet: false
    });
  });
});
